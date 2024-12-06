package com.hgbaodev.backend.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class PaymentService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public Charge createCharge(String token, double amount) throws StripeException {
        ChargeCreateParams params = ChargeCreateParams.builder()
                .setAmount((long) (amount * 100)) // amount in cents
                .setCurrency("usd")
                .setDescription("Example charge")
                .setSource(token)
                .build();

        return Charge.create(params);
    }
}