package com.example.ventas.api

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST
import com.example.ventas.model.LoginRequest
import com.example.ventas.model.LoginResponse

interface ApiService {

    @POST("login")
    fun login(@Body request: LoginRequest): Call<LoginResponse>
}