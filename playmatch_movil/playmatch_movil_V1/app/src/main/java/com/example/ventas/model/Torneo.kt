package com.example.ventas.model
import java.util.Date

data class Torneo (

    val id_torneo:Int? = null,
    val nombre: String,
    val descripcion: String,
    val fecha_inicio: Date,
    val fecha_fin: Date,
    val estado: Sring

)