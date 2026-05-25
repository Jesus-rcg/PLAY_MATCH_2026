package com.example.ventas

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class OperacionesActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.menu_usuarios)

        val modulo =
            intent.getStringExtra("MODULO") ?: "Módulo"

        val txtTitulo =
            findViewById<TextView>(R.id.txtTituloModulo)

        txtTitulo.text = modulo

        val btnVolver =
            findViewById<ImageButton>(R.id.btnVolver)

        btnVolver.setOnClickListener {
            finish()
        }

        val cardGuardar =
            findViewById<LinearLayout>(R.id.tarjetaGuardar)

        val cardBuscar =
            findViewById<LinearLayout>(R.id.tarjetaBuscar)

        val cardEditar =
            findViewById<LinearLayout>(R.id.tarjetaEditar)

        val cardEliminar =
            findViewById<LinearLayout>(R.id.tarjetaEliminar)

        val cardVerTodos =
            findViewById<LinearLayout>(R.id.tarjetaVerTodos)

        // ================= GUARDAR =================

        cardGuardar.setOnClickListener {

            when (modulo) {

                "Jugadores" -> {

                    startActivity(
                        Intent(
                            this,
                            CrearJugadorActivity::class.java
                        )
                    )
                }

                "Equipos" -> {

                    startActivity(
                        Intent(
                            this,
                            com.example.ventas.ui.EquipoActivity::class.java
                        )
                    )
                }

                "Usuarios" -> {

                    startActivity(
                        Intent(
                            this,
                            CrearUsuarioActivity::class.java
                        )
                    )
                }

                "Torneos" -> {

                    startActivity(
                        Intent(
                            this,
                            CrearTorneoActivity::class.java
                        )
                    )
                }

                else -> {

                    Toast.makeText(
                        this,
                        "Formulario no disponible",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }

        // ================= BUSCAR =================

        cardBuscar.setOnClickListener {

            when (modulo) {

                "Jugadores" -> {

                    startActivity(
                        Intent(
                            this,
                            BuscarJugadorActivity::class.java
                        )
                    )
                }

                else -> {

                    Toast.makeText(
                        this,
                        "Buscar no disponible",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }
}
