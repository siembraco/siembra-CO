<?php

namespace Drupal\commerce_payu_webcheckout_siembraco\Plugin\Commerce\PayuItem;

use Drupal\commerce_payu_webcheckout_siembraco\Plugin\PayuItemBase;
use Symfony\Component\HttpFoundation\Request;

/**
 * Consumes the nickname buyer parameter.
 *
 * @PayuItem(
 *   id = "nickname_buyer"
 * )
 */
class NicknameBuyer extends PayuItemBase {

  /**
   * {@inheritdoc}
   */
  public function consumeValue(Request $request) {
    return $request->get($this->getConsumerId());
  }

}
