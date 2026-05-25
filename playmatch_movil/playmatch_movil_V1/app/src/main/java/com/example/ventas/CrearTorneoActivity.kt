package com.example.ventas

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ImageButton
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.ventas.api.ApiClient
import com.example.ventas.model.Estado
import com.example.ventas.model.Torneo
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.Date

class CrearTorneoActivity : AppCompatActivity() {

    
    private lateinit var spEstados: Spinner

    
    private var listaEstados = mutableListOf<Estado>()

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_crear_torneo)

        findViewById<ImageButton>(R.id.btnVolver).setOnClickListener {
            finish()
        }

        // SPINNERS

        spEstados = findViewById(R.id.spEstados)

        cargarEstados()

        // INPUTS

        val txtNombre =
            findViewById<EditText>(R.id.txtNombre)

        val txtDescripcion =
            findViewById<EditText>(R.id.txtDescripcion)

        val txtFecha_inicio =
            findViewById<EditText>(R.id.txtFecha_inicio)

        val txtFecha_fin =
            findViewById<EditText>(R.id.txtFecha_fin)

        // BOTON

        val btnGuardarTorneo =
            findViewById<Button>(R.id.btnGuardarTorneo)

        // CLICK BOTON

        btnGuardarTorneo.setOnClickListener {


            val posicionEstado =
                spEstados.selectedItemPosition


            val idEstado =
                listaEstados[posicionEstado].id_estado

            val torneo = Torneo(

                nombre = txtNombre.text.toString(),

                descripcion = txtDescripcion.text.toString(),

                fecha_inicio = txtFecha_inicio.text.toString(),

                fecha_fin = txtFecha_fin.text.toString(),

                estado = idEstado

            )

            // TOKEN

            val prefs =
                getSharedPreferences("app", MODE_PRIVATE)

            val token =
                prefs.getString("token", "") ?: ""

            // PETICION API

            ApiClient.instance.createTorneo(

                "Bearer $token",
                torneo

            ).enqueue(object : Callback<Torneo> {

                override fun onResponse(
                    call: Call<Torneo>,
                    response: Response<Torneo>
                ) {

                    if (response.isSuccessful) {

                        Toast.makeText(
                            this@CrearTorneoActivity,
                            "Torneo guardado correctamente",
                            Toast.LENGTH_LONG
                        ).show()

                        // LIMPIAR CAMPOS

                        txtNombre.text.clear()
                        txtDescripcion.text.clear()
                        txtFecha_inicio.text.clear()
                        txtFecha_fin.text.clear()
                        spEstados.setSelection(0)

                    } else {

                        Toast.makeText(
                            this@CrearTorneoActivity,
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
                    call: Call<Torneo>,
                    t: Throwable
                ) {

                    Toast.makeText(
                        this@CrearTorneoActivity,
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


    private fun cargarEstados() {

        val prefs =
            getSharedPreferences("app", MODE_PRIVATE)

        val token =
            prefs.getString("token", "") ?: ""

        ApiClient.instance.getEstado("Bearer $token")
            .enqueue(object : Callback<List<Estado>> {

                override fun onResponse(
                    call: Call<List<Estado>>,
                    response: Response<List<Estado>>
                ) {

                    if (response.isSuccessful && response.body() != null) {

                        listaEstados =
                            response.body()!!.toMutableList()

                        val nombres =
                            listaEstados.map { it.nombre }

                        val adapter = ArrayAdapter(
                            this@CrearTorneoActivity,
                            android.R.layout.simple_spinner_item,
                            nombres
                        )

                        adapter.setDropDownViewResource(
                            android.R.layout.simple_spinner_dropdown_item
                        )

                        spEstados.adapter = adapter
                    }
                }

                override fun onFailure(
                    call: Call<List<Estado>>,
                    t: Throwable
                ) {

                    Toast.makeText(
                        this@CrearTorneoActivity,
                        "Error cargando estados",
                        Toast.LENGTH_LONG
                    ).show()
                }
            })
    }
}