<?php

namespace Drupal\siembraco_core\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\file\Entity\File;
use Drupal\commerce_order\Controller\AddressBookController;
use Drupal\commerce_order\AddressBookInterface;
use Drupal\Core\Entity\EntityFormBuilderInterface;
use Drupal\Core\Form\FormBuilderInterface;
use Drupal\Core\Config\ConfigFactory;
use Drupal\siembraco_core\Form\AcceptTermsConditions;
use Drupal\Core\Access\AccessResult;

/**
 * Provides a 'Custom Siembraco account' Block.
 *
 * @Block(
 *   id = "siembraco_account_block",
 *   admin_label = @Translation("Siembraco account")
 * )
 */
class SiembracoAccountBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * @var AccountInterface $account
   */
  protected $account;

  /**
   * @var EntityTypeManagerInterface $entityManager
   */
  protected $entityManager;

    /**
   * The address book.
   *
   * @var \Drupal\commerce_order\AddressBookInterface
   */
  protected $addressBook;

  /**
   * The entity form builder.
   *
   * @var \Drupal\Core\Entity\EntityFormBuilderInterface
   */
  protected $entityFormBuilder;

  /**
   * The form builder.
   *
   * @var \Drupal\Core\Form\FormBuilderInterface
   */
  protected $formBuilder;

  /**
   * The ConfigFactory.
   *
   * @var \Drupal\Core\Config\ConfigFactory
   */
  protected $configFactory;

  /**
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   * @param \Drupal\Core\Session\AccountInterface $account
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, AccountInterface $account, EntityTypeManagerInterface $entity_manager, AddressBookInterface $address_book, EntityFormBuilderInterface $entity_form_builder, FormBuilderInterface $form_builder, ConfigFactory $config_factory) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->account = $account;
    $this->entityManager = $entity_manager;
    $this->addressBook = $address_book;
    $this->entityFormBuilder = $entity_form_builder;
    $this->formBuilder = $form_builder;
    $this->configFactory = $config_factory;
  }

  /**
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   *
   * @return static
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_user'),
      $container->get('entity_type.manager'),
      $container->get('commerce_order.address_book'),
      $container->get('entity.form_builder'),
      $container->get('form_builder'),
      $container->get('config.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $user_entity = $this->entityManager
      ->getStorage('user')
      ->load($this->account->id());
    // Get user basic data
    $user_name = $this->account->getAccountName();
    $user_mail = $this->account->getEmail();
    $fid = $user_entity->user_picture->target_id;
    $file = File::load($fid);
    $user_image = !empty($file) ? $file->createFileUrl() : '';

    // Get and edit user form
    $formObject = $this->entityManager
      ->getFormObject('user', 'default')
      ->setEntity($user_entity);

    $user_form = $this->formBuilder->getForm($formObject);
    unset($user_form['agricultor_profiles']);
    unset($user_form['contact']);
    unset($user_form['timezone']);
    unset($user_form['language']);
    unset($user_form['user_picture']);
    unset($user_form['account']['status']);
    unset($user_form['account']['roles']);

    // Get orders view per user.
    $view = [
    '#type' => 'view',
    '#name' => 'commerce_user_orders',
    '#display_id' => 'order_page',
    '#arguments' => [$this->account->id()],
    '#embed' => TRUE,
    ];

    // Billing profiles for the user.
    $profiles_handler = new AddressBookController($this->addressBook, $this->entityFormBuilder, $this->entityManager);
    $render_billing_profiles = $profiles_handler->overviewPage($user_entity);

    // Terms and conditions.
    $account_settings = $this->configFactory->get('siembraco_core.account_settings');
    $terms_text = $account_settings->get('conditions');
    $terms_form_instance = new AcceptTermsConditions($this->account, $this->entityManager);
    $term_form_render = $this->formBuilder->getForm($terms_form_instance);

    // Privacy link.
    $privacy_link = $account_settings->get('privacy_link');
    return [
      '#theme' => 'siembraco_account',
      '#data' => [
        'user_name' => $user_name,
        'user_mail' => $user_mail,
        'user_image' => $user_image,
        'user_form' => $user_form,
        'order_view' => $view,
        'billing_profiles' => $render_billing_profiles,
        'terms_conditions' => $terms_text,
        'terms_conditions_form' => $term_form_render,
        'privacy_link' => $privacy_link,
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  protected function blockAccess(AccountInterface $account) {
    if ($account->isAuthenticated()) {
      return AccessResult::allowed();
    } else {
      return AccessResult::forbidden($this->t('Necesita iniciar sesión para usar esta funcionalidad'));
    }
  }

}
