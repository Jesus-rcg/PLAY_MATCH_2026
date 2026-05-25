package com.example.ventas

import android.os.Bundle
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import android.content.Intent

class OperacionesActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.menu_usuarios)

        val modulo = intent.getStringExtra("MODULO") ?: "Módulo"

        val txtTitulo = findViewById<TextView>(R.id.txtTituloModulo)
        txtTitulo.text = modulo

        val btnVolver = findViewById<android.widget.ImageButton>(R.id.btnVolver)
        btnVolver.setOnClickListener {
            finish()
        }

        val cardGuardar  = findViewById<LinearLayout>(R.id.tarjetaGuardar)
        val cardBuscar   = findViewById<LinearLayout>(R.id.tarjetaBuscar)
        val cardEditar   = findViewById<LinearLayout>(R.id.tarjetaEditar)
        val cardEliminar = findViewById<LinearLayout>(R.id.tarjetaEliminar)
        val cardVerTodos = findViewById<LinearLayout>(R.id.tarjetaVerTodos)

        cardGuardar.setOnClickListener {

            when(modulo){

                "Jugadores" -> {
                    startActivity(
                        Intent(this, CrearJugadorActivity::class.java)
                    )
                }

                "Equipos" -> {
                    startActivity(
                        Intent(this, com.example.ventas.ui.EquipoActivity::class.java)
                    )
                }

                "Usuarios" -> {
                    startActivity(
                        Intent(this, CrearUsuarioActivity::class.java)
                    )
                }
                "Torneos" -> {
                    startActivity(
                        Intent(this, CrearTorneoActivity::class.java)
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

        cardEditar.setOnClickListener {
            when(modulo) {
                "Equipos" -> {
                    startActivity(
                        Intent(this, com.example.ventas.ui.ListaEquiposActivity::class.java)
                    )
                }
                "Torneos" -> {
                    startActivity(
                        Intent(this, com.example.ventas.ui.ListaTorneosActivity::class.java)
                    )
                }
                else -> {
                    Toast.makeText(this, "Editar - $modulo", Toast.LENGTH_SHORT).show()
                }
            }
        }

        cardEliminar.setOnClickListener {
            when(modulo) {
                "Equipos" -> {
                    startActivity(
                        Intent(this, com.example.ventas.ui.ListaEquiposActivity::class.java)
                    )
                }
                    "Torneos" -> {
                        startActivity(
                            Intent(this, com.example.ventas.ui.ListaTorneosActivity::class.java)
                        )
                    }
                else -> {
                    Toast.makeText(this, "Eliminar - $modulo", Toast.LENGTH_SHORT).show()
                }
            }
        }
        cardVerTodos.setOnClickListener {
            when(modulo) {
                "Equipos" -> {
                    startActivity(
                        Intent(this, com.example.ventas.ui.ListaEquiposActivity::class.java)
                    )
                }
                "Torneos" -> {
                    startActivity(
                        Intent(this, com.example.ventas.ui.ListaTorneosActivity::class.java)
                    )
                }
                else -> {
                    Toast.makeText(this, "Ver todos - $modulo", Toast.LENGTH_SHORT).show()
                }
            }

        }
    }
}