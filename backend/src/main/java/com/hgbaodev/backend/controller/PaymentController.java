package com.hgbaodev.backend.controller;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    public PaymentController() {
        Stripe.apiKey = stripeApiKey;
    }

    @PostMapping("/create-checkout-session")
    public String createCheckoutSession() {
        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .addLineItem(SessionCreateParams.LineItem.builder()
                            .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("usd")
                                    .setUnitAmount(Long.valueOf(200))
                                    .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName("Thanh toán Family Heath")
                                            .build())
                                    .build())
                            .setQuantity(1L)
                            .build())
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:3000/manager")
                    .setCancelUrl("http://localhost:3000/manager")
                    .build();

            Session session = Session.create(params);
            return session.getUrl();
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}