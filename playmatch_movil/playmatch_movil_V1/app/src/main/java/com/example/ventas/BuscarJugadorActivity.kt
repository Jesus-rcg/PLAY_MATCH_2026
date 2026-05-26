package com.example.ventas

    import android.annotation.SuppressLint
    import android.os.Bundle
    import android.util.Log
    import android.widget.Button
    import android.widget.EditText
    import android.widget.ImageButton
    import android.widget.TextView
    import android.widget.Toast
    import androidx.appcompat.app.AppCompatActivity
    import com.example.ventas.api.ApiClient
    import com.example.ventas.model.Jugador
    import retrofit2.Call
    import retrofit2.Callback
    import retrofit2.Response

    class BuscarJugadorActivity : AppCompatActivity() {

        @SuppressLint("MissingInflatedId")
        override fun onCreate(savedInstanceState: Bundle?) {

            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_buscar_jugador)

            // BOTON VOLVER

            findViewById<ImageButton>(R.id.btnVolver).setOnClickListener {
                finish()
            }

            // INPUT

            val txtIdBuscar =
                findViewById<EditText>(R.id.txtIdBuscar)

            // TEXTVIEWS

            val tvNombre =
                findViewById<TextView>(R.id.tvNombre)

            val tvApellido =
                findViewById<TextView>(R.id.tvApellido)

            val tvDocumento =
                findViewById<TextView>(R.id.tvDocumento)

            val tvNumero =
                findViewById<TextView>(R.id.tvNumero)

            // BOTON

            val btnBuscarJugador =
                findViewById<Button>(R.id.btnBuscarJugador)

            // CLICK

            btnBuscarJugador.setOnClickListener {

                val id =
                    txtIdBuscar.text.toString().toIntOrNull()

                if (id == null) {

                    Toast.makeText(
                        this,
                        "Ingrese un ID válido",
                        Toast.LENGTH_LONG
                    ).show()

                    return@setOnClickListener
                }

                // TOKEN

                val prefs =
                    getSharedPreferences("app", MODE_PRIVATE)

                val token =
                    prefs.getString("token", "") ?: ""

                // PETICION API

                ApiClient.instance.getJugador(

                    "Bearer $token",
                    id

                ).enqueue(object : Callback<Jugador> {

                    override fun onResponse(
                        call: Call<Jugador>,
                        response: Response<Jugador>
                    ) {

                        if (response.isSuccessful && response.body() != null) {

                            val jugador = response.body()!!

                            tvNombre.text =
                                "Nombre: ${jugador.nombre}"

                            tvApellido.text =
                                "Apellido: ${jugador.apellido}"

                            tvDocumento.text =
                                "Documento: ${jugador.documento}"

                            tvNumero.text =
                                "Número camiseta: ${jugador.numero_camiseta}"

                        } else {

                            Toast.makeText(
                                this@BuscarJugadorActivity,
                                "Jugador no encontrado",
                                Toast.LENGTH_LONG
                            ).show()
                        }
                    }

                    override fun onFailure(
                        call: Call<Jugador>,
                        t: Throwable
                    ) {

                        Toast.makeText(
                            this@BuscarJugadorActivity,
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