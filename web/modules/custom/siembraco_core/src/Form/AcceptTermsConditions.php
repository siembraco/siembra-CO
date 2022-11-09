<?php

namespace Drupal\siembraco_core\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Implements an Terms and conditions acceptance form.
 */
class AcceptTermsConditions extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'terms_conditions_form';
  }

  /**
   * Class constructor.
   */
  public function __construct(AccountInterface $account, EntityTypeManagerInterface $entity_manager) {
    $this->account = $account;
    $this->entityManager = $entity_manager;
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $user_entity = $this->get_current_user();

    $form['accept'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Acepto Términos, Condiciones y Tratamiento de datos personales'),
      '#return_value' => TRUE,
      '#default_value' => $user_entity->field_terms_and_conditions->value,
    ];
    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Enviar'),
      '#required' => TRUE
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $user = $user_entity = $this->get_current_user();
    $user->set('field_terms_and_conditions', $form_state->getValue('accept'));
    $user->save();
  }

  public function get_current_user() {
    return $this->entityManager
      ->getStorage('user')
      ->load($this->account->id());
  }
}
