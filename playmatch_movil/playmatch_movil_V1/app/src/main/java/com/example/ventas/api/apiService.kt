package com.example.ventas.api

import com.example.ventas.model.Usuario
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST
import com.example.ventas.model.LoginRequest
import com.example.ventas.model.LoginResponse
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path
import retrofit2.http.PUT
import retrofit2.http.DELETE

interface ApiService {

    @POST("login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>

    @POST("usuarios")
    fun createUsuario(
        @Header("Authorization") token: String,
        @Body usuario: Usuario
    ): Call<Usuario>

    @GET("usuarios")
    fun getUsuarios(
        @Header("Authorization") token: String
    ): Call<List<Usuario>>

    @GET("usuarios/{id}")
    fun getUsuario(
        @Header("Authorization") token: String,
        @Path("id") id: Int
    ): Call<Usuario>

    @PUT("usuarios/{id}")
    fun updateUsuario(
        @Header("Authorization") token: String,
        @Path ("id") id:Int,
        @Body usuario: Usuario
    ): Call<Void>

    @DELETE ("usuarios/{id}")
    fun deleteUsuario(
        @Header("Authorization") token:String,
        @Path("id") id: Int
    ): Call<Void>
}