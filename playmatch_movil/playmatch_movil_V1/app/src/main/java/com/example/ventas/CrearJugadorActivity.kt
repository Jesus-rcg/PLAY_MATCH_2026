package com.example.ventas

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.ventas.api.ApiClient
import com.example.ventas.model.Jugador
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CrearJugadorActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_crear_jugador)



        // INPUTS

        val txtIdEquipo =
            findViewById<EditText>(R.id.txtIdEquipo)

        val txtNombre =
            findViewById<EditText>(R.id.txtNombre)

        val txtApellido =
            findViewById<EditText>(R.id.txtApellido)

        val txtDocumento =
            findViewById<EditText>(R.id.txtDocumento)

        val txtNumeroCamiseta =
            findViewById<EditText>(R.id.txtNumeroCamiseta)

        val txtEstado =
            findViewById<EditText>(R.id.txtEstado)



        // BOTON

        val btnGuardarJugador =
            findViewById<Button>(R.id.btnGuardarJugador)



        // CLICK BOTON

        btnGuardarJugador.setOnClickListener {

            val jugador = Jugador(

                id_equipo = txtIdEquipo.text.toString(),

                nombre = txtNombre.text.toString(),

                apellido = txtApellido.text.toString(),

                documento = txtDocumento.text.toString(),

                numero_camiseta =
                    txtNumeroCamiseta.text.toString(),

                estado = txtEstado.text.toString()

            )



            // TOKEN

            val prefs =
                getSharedPreferences("app", MODE_PRIVATE)

            val token =
                prefs.getString("token", "") ?: ""



            // PETICION API

            ApiClient.instance.createJugador(

                "Bearer $token",
                jugador

            ).enqueue(object : Callback<Jugador> {

                override fun onResponse(
                    call: Call<Jugador>,
                    response: Response<Jugador>
                ) {

                    if (response.isSuccessful) {

                        Toast.makeText(
                            this@CrearJugadorActivity,
                            "Jugador guardado correctamente",
                            Toast.LENGTH_LONG
                        ).show()



                        // LIMPIAR CAMPOS

                        txtIdEquipo.text.clear()
                        txtNombre.text.clear()
                        txtApellido.text.clear()
                        txtDocumento.text.clear()
                        txtNumeroCamiseta.text.clear()
                        txtEstado.text.clear()

                    } else {

                        Toast.makeText(
                            this@CrearJugadorActivity,
                            "Error ${response.code()}",
                            Toast.LENGTH_LONG
                        ).show()

                        Log.e(
                            "API_ERROR",
                            response.errorBody()?.string()
                                ?: "Error desconocido"
                        )
                    }
                }

                override fun onFailure(
                    call: Call<Jugador>,
                    t: Throwable
                ) {

                    Toast.makeText(
                        this@CrearJugadorActivity,
                        t.message,
                        Toast.LENGTH_LONG
                    ).show()

                    Log.e(
                        "API_ERROR",
                        t.message.toString()
                    )
                }
            })
        }
    }
}