<?php

namespace Drupal\commerce_payu_webcheckout_siembraco\Plugin\Commerce\PayuItem;

use Drupal\commerce_payu_webcheckout_siembraco\Plugin\PayuItemBase;
use Symfony\Component\HttpFoundation\Request;

/**
 * Consumes the Payment method parameter.
 *
 * @PayuItem(
 *   id = "payment_method"
 * )
 */
class PaymentMethod extends PayuItemBase {

  /**
   * {@inheritdoc}
   */
  public function consumeValue(Request $request) {
    return $request->get($this->getConsumerId());
  }

}
