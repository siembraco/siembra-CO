<?php

namespace Drupal\siembraco_core\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Block\BlockManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Render\Renderer;

/**
 * Defines Account class.
 */
class AccountSiembracoController extends ControllerBase {

  /**
   * The block manager service.
   *
   * @var \Drupal\Core\Block\BlockManager
   */
  protected $pluginManager;

  /**
   * @var \Drupal\Core\Session\AccountInterface $account
   */
  protected $account;

  /**
   * @var \Drupal\Core\Render\Renderer $renderer
   */
  protected $renderer;

  /**
   * Constructs a controller object
   *
   * @param \Drupal\Core\Block\BlockManager $module_handler
   *   The module handler service.
   */
  public function __construct(BlockManager $plugin_manager, AccountInterface $account, Renderer $renderer) {
    $this->pluginManager = $plugin_manager;
    $this->account = $account;
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('plugin.manager.block'),
      $container->get('current_user'),
      $container->get('renderer')
    );
  }

  /**
   * Display the markup.
   *
   * @return array
   *   Return markup array.
   */
  public function account() {
    $config = [];
    $plugin_block = $this->pluginManager->createInstance('siembraco_account_block', $config);
    // Some blocks might implement access check.
    $access_result = $plugin_block->access($this->account);
    // Return empty render array if user doesn't have access.
    // $access_result can be boolean or an AccessResult class
    if (is_object($access_result) && $access_result->isForbidden() || is_bool($access_result) && !$access_result) {
      // You might need to add some cache tags/contexts.
      return [];
    }
    $render = $plugin_block->build();
    // Add the cache tags/contexts.
    $this->renderer->addCacheableDependency($render, $plugin_block);
    return $render;
  }

}
