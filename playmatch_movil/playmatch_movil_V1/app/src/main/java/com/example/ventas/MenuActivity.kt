package com.example.ventas

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class MenuActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_menu)

        val btnUsuario = findViewById<ImageButton>(R.id.btnUser)

        btnUsuario.setOnClickListener {
            val intent = Intent(this, UsuarioOperacionesActivity::class.java)
            startActivity(intent)
        }
    }
}