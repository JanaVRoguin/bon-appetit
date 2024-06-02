package com.bonappetit.bonappetitApi.dto.salida.Usuario;


import com.bonappetit.bonappetitApi.entity.Role;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioSalidaDto {
    private Long id;
    private String nombre;
    private String apellido;
    private String correo;
    private Set<Role> roles;
}
