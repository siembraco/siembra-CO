<?php

namespace Drupal\commerce_payu_webcheckout_siembraco\Plugin\Commerce\PayuItem;

/**
 * Appends the payerFullName.
 *
 * If you need to change how this is calculated, I suggest
 * you use the hook hook_payu_item_plugin_alter().
 *
 * @see commerce_payu_webcheckout_siembraco.api.php
 *
 * @PayuItem(
 *   id = "payerFullName"
 * )
 */
class PayerFullName extends BuyerFullName {

}
