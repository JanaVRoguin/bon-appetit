package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.entity.Usuario;
import com.bonappetit.bonappetitApi.service.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendRegistrationEmail(String toEmail, Usuario user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("¡REGISTRO EXITOSO!");
        message.setText("Hola " + user.getNombre() + " ¡Gracias por registrarte en nuestra aplicación!");
        mailSender.send(message);
    }
}
