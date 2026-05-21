package com.example.ventas

import android.content.Intent
import android.os.Bundle
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.ventas.ui.EquipoActivity

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

            if (modulo == "Equipos") {

                val intent = Intent(this, EquipoActivity::class.java)
                startActivity(intent)

            } else {

                Toast.makeText(
                    this,
                    "Guardar - $modulo",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

        cardBuscar.setOnClickListener {

            Toast.makeText(
                this,
                "Buscar - $modulo",
                Toast.LENGTH_SHORT
            ).show()
        }

        cardEditar.setOnClickListener {

            Toast.makeText(
                this,
                "Editar - $modulo",
                Toast.LENGTH_SHORT
            ).show()
        }

        cardEliminar.setOnClickListener {

            Toast.makeText(
                this,
                "Eliminar - $modulo",
                Toast.LENGTH_SHORT
            ).show()
        }

        cardVerTodos.setOnClickListener {

            Toast.makeText(
                this,
                "Ver todos - $modulo",
                Toast.LENGTH_SHORT
            ).show()
        }
    }
}