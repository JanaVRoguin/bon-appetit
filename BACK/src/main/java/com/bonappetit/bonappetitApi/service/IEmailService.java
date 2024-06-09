package com.bonappetit.bonappetitApi.service;

import com.bonappetit.bonappetitApi.entity.Usuario;

public interface IEmailService {
    public void sendRegistrationEmail(String toEmail, Usuario user);
}
