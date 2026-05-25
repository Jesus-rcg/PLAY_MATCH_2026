package com.example.ventas.ui

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.ventas.R
import com.example.ventas.api.ApiClient
import com.example.ventas.model.Equipo
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class EquipoActivity : AppCompatActivity() {

    private lateinit var etNombre: EditText
    private lateinit var etEntrenador: EditText
    private lateinit var btnGuardar: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_equipo)

        etNombre = findViewById(R.id.etNombre)
        etEntrenador = findViewById(R.id.etEntrenador)
        btnGuardar = findViewById(R.id.btnGuardar)

        btnGuardar.setOnClickListener {
            crearEquipo()
        }
    }

    private fun crearEquipo() {

        val equipo = Equipo(

            id_torneo = 1,
            nombre = etNombre.text.toString(),
            entrenador = etEntrenador.text.toString()
        )

        val prefs = getSharedPreferences("app", MODE_PRIVATE)

        val token = prefs.getString("token", "") ?: ""

        ApiClient.instance.createEquipo(
            "Bearer $token",
            equipo
        ).enqueue(object : Callback<Equipo> {

            override fun onResponse(
                call: Call<Equipo>,
                response: Response<Equipo>
            ) {

                if (response.isSuccessful) {

                    Toast.makeText(
                        this@EquipoActivity,
                        "Equipo creado correctamente",
                        Toast.LENGTH_SHORT
                    ).show()

                    etNombre.text.clear()
                    etEntrenador.text.clear()

                } else {

                    Toast.makeText(
                        this@EquipoActivity,
                        "Error al crear",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }

            override fun onFailure(call: Call<Equipo>, t: Throwable) {

                Toast.makeText(
                    this@EquipoActivity,
                    "Error de conexión",
                    Toast.LENGTH_SHORT
                ).show()
            }
        })
    }
}