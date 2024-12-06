package com.hgbaodev.backend.dto.request.payment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentRequest {
    private long amount;
}