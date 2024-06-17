package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.entity.Usuario;
import com.bonappetit.bonappetitApi.service.IEmailService;
import com.resend.*;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailService {
    @Override
    public void sendEmail(Usuario usuario) {
        Resend client = new Resend("re_NcGeHJPU_4Aj8Q4amYo2BLjbtzAuBwo1y");
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("¡Bonappetit! <onboarding@resend.dev>")
                .to(usuario.getCorreo())
                .subject("¡Bienvenido a Bonappetit!")
                .html("<strong>¡Hola " + usuario.getNombre() + "! Tu registro ha sido exitoso</strong>")
                .build();

        try {
            CreateEmailResponse data = client.emails().send(params);
            System.out.println("Email Enviado Usuario registrado: " + data);
        } catch (ResendException e) {
            e.printStackTrace();
            System.out.println("Error al enviar el email");
        }
    }
}
