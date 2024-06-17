package com.bonappetit.bonappetitApi.service;

import com.bonappetit.bonappetitApi.entity.Usuario;

public interface IEmailService {
    void sendEmail(Usuario usuario);
}
