<?php

namespace Drupal\siembraco_core\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure account settings for this site.
 */
class SiembracoAccountSettings extends ConfigFormBase {

  /**
   * Config settings.
   *
   * @var string
   */
  const SETTINGS = 'siembraco_core.account_settings';

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'siembraco_core_account_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      static::SETTINGS,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config(static::SETTINGS);

    $form['conditions'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Terminos y condiciones'),
      '#default_value' => $config->get('conditions'),
      '#required' => TRUE,
    ];

    $form['privacy_link'] = [
      '#type' => 'url',
      '#title' => $this->t('Link politicas de privacidad'),
      '#default_value' => $config->get('privacy_link'),
      '#required' => TRUE,
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Retrieve the configuration.
    $this->configFactory->getEditable(static::SETTINGS)
      // Set the submitted configuration setting.
      ->set('conditions', $form_state->getValue('conditions')['value'])
      ->set('privacy_link', $form_state->getValue('privacy_link'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}
