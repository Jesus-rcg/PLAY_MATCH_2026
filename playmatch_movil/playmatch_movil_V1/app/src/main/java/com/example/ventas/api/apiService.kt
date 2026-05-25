package com.example.ventas.api

import com.example.ventas.model.Usuario
import com.example.ventas.model.Jugador
import com.example.ventas.model.LoginRequest
import com.example.ventas.model.LoginResponse

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path
import retrofit2.http.PUT
import retrofit2.http.DELETE
import com.example.ventas.model.Equipo
import com.example.ventas.model.Estado

interface ApiService {

    // ================= LOGIN =================

    @POST("login")
    fun login(
        @Body request: LoginRequest
    ): Call<LoginResponse>


    // ================= USUARIOS =================

    @POST("usuarios")
    fun createUsuario(

        @Header("Authorization")
        token: String,

        @Body
        usuario: Usuario

    ): Call<Usuario>


    @GET("usuarios")
    fun getUsuarios(

        @Header("Authorization")
        token: String

    ): Call<List<Usuario>>


    @GET("usuarios/{id}")
    fun getUsuario(

        @Header("Authorization")
        token: String,

        @Path("id")
        id: Int

    ): Call<Usuario>


    @PUT("usuarios/{id}")
    fun updateUsuario(

        @Header("Authorization")
        token: String,

        @Path("id")
        id: Int,

        @Body
        usuario: Usuario

    ): Call<Void>


    @DELETE("usuarios/{id}")
    fun deleteUsuario(

        @Header("Authorization")
        token: String,

        @Path("id")
        id: Int

    ): Call<Void>


    // ================= JUGADORES =================

    @POST("jugadores")
    fun createJugador(

        @Header("Authorization")
        token: String,

        @Body
        jugador: Jugador

    ): Call<Jugador>


    @GET("jugadores")
    fun getJugadores(

        @Header("Authorization")
        token: String

    ): Call<List<Jugador>>


    @GET("jugadores/{id}")
    fun getJugador(

        @Header("Authorization")
        token: String,

        @Path("id")
        id: Int

    ): Call<Jugador>


    @PUT("jugadores/{id}")
    fun updateJugador(

        @Header("Authorization")
        token: String,

        @Path("id")
        id: Int,

        @Body
        jugador: Jugador

    ): Call<Void>


    @DELETE("jugadores/{id}")
    fun deleteJugador(

        @Header("Authorization")
        token: String,

        @Path("id")
        id: Int

    ): Call<Void>




    // ================= EQUIPO =================
    @POST("equipos")
    fun createEquipo(

        @Header("Authorization") token: String,

        @Body equipo: Equipo


    ): Call<Equipo>

    @GET("equipos")
    fun getEquipos(
        @Header("Authorization") token: String
    ): Call<List<Equipo>>

    @GET("equipos/{id}")
    fun getEquipo(
        @Header("Authorization") token: String,
        @Path("id") id: Int
    ): Call<Equipo>

    @PUT("equipos/{id}")
    fun updateEquipo(
        @Header("Authorization") token: String,
        @Path("id") id: Int,
        @Body equipo: Equipo
    ): Call<Void>

    @DELETE("equipos/{id}")
    fun deleteEquipo(
        @Header("Authorization") token: String,
        @Path("id") id: Int
    ): Call<Void>


        @Header("Authorization")
        token: String

    ): Call<List<Estado>>


    // =========== Estado =================
    @GET("estados")
    fun getEstado(

        @Header("Authorization")
        token: String

    ): Call<List<Estado>>

//============ Torneo =================

    @POST("torneos")
    fun createTorneo(

        @Header("Authorization") token: String,

        @Body torneo: Torneo
    ): Call<Torneo>
}