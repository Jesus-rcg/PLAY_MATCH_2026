package com.example.ventas

import android.os.Bundle
import android.widget.EditText
import android.widget.Button
import android.widget.Toast
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.example.ventas.api.ApiClient
import com.example.ventas.model.Usuario
import retrofit2.Call
import retrofit2.Response


class UsuarioActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_usuarios)

        val txtNombre = findViewById<EditText>(R.id.txtNombre)
        val txtEmail = findViewById<EditText>(R.id.txtEmail)
        val txtPassword = findViewById<EditText>(R.id.txtPassword)
        val txtRol = findViewById<EditText>(R.id.txtRol)
        val txtEstado = findViewById<EditText>(R.id.txtEstado)
        val txtFecha = findViewById<EditText>(R.id.txtFecha)


        val btnGuardar = findViewById<Button>(R.id.btnGuardar)
        val btnBuscar = findViewById<Button>(R.id.btnBuscar)
        val btnEditar = findViewById<Button>(R.id.btnEditar)
        val btnEliminar = findViewById<Button>(R.id.btnEliminar)

        btnGuardar.setOnClickListener {

            val usuario = Usuario(
                nombre = txtNombre.text.toString(),
                email = txtEmail.text.toString(),
                password = txtPassword.text.toString(),
                rol = txtRol.text.toString(),
                estado = txtEstado.text.toString(),
                fecha_actualizado = txtFecha.text.toString()
            )

            val prefs = getSharedPreferences("app", MODE_PRIVATE)

            val token = prefs.getString("token", "") ?: ""

            ApiClient.instance.createUsuario(
                "Bearer $token",
                usuario
            ).enqueue(object: retrofit2.Callback<Usuario>{

                override fun onResponse(call: Call<Usuario?>, response: Response<Usuario?>)
                {
                    if (response.isSuccessful){
                        Toast.makeText(
                            this@UsuarioActivity,
                            "Usuario guardado correctamente.",
                            Toast.LENGTH_LONG
                        ).show()



                    } else {
                        Toast.makeText(
                            this@UsuarioActivity,
                            "Error: ${response.code()}",
                            Toast.LENGTH_LONG
                        ).show()

                        Log.e("API_ERROR", response.errorBody()?.string() ?: "Error")
                    }


                }

                override fun onFailure(call: retrofit2.Call<Usuario?>, t: Throwable) {
                    Toast.makeText(
                        this@UsuarioActivity,
                        t.message,
                        Toast.LENGTH_LONG
                    ).show()

                    Log.e("API_ERROR", t.message.toString())
                }
            })


        }


        //Buscar
        btnBuscar.setOnClickListener {
            Toast.makeText(this, "Buscar usuario", Toast.LENGTH_SHORT).show()

            //Editar
            btnEditar.setOnClickListener {
                Toast.makeText(this, "Usuario editado", Toast.LENGTH_SHORT).show()
            }
            //Eliminar
            btnEliminar.setOnClickListener {
                Toast.makeText(this, "Usuario eliminado", Toast.LENGTH_SHORT).show()
            }

        }
    }
}
