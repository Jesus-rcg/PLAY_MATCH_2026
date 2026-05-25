package com.example.ventas.model
import java.util.Date

data class Torneo (

    val id_torneo:Int? = null,
    val nombre: String,
    val descripcion: String,
    val fecha_inicio: String,
    val fecha_fin: String,
    val estado: Int

)