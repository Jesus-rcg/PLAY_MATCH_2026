package com.example.ventas

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.ventas.api.ApiClient
import com.example.ventas.model.Usuario
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class VerUsuariosActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ver_usuarios)

        findViewById<ImageButton>(R.id.btnVolver).setOnClickListener {
            finish()
        }

        val recycler     = findViewById<RecyclerView>(R.id.recyclerUsuarios)
        val progressBar  = findViewById<ProgressBar>(R.id.progressBar)
        val txtContador  = findViewById<TextView>(R.id.txtContador)

        recycler.layoutManager = LinearLayoutManager(this)

        val token = getSharedPreferences("app", MODE_PRIVATE)
            .getString("token", "") ?: ""

        progressBar.visibility = View.VISIBLE

        ApiClient.instance.getUsuarios("Bearer $token")
            .enqueue(object : Callback<List<Usuario>> {

                override fun onResponse(
                    call: Call<List<Usuario>>,
                    response: Response<List<Usuario>>
                ) {
                    progressBar.visibility = View.GONE

                    if (response.isSuccessful) {
                        val lista = response.body() ?: emptyList()
                        txtContador.text = "${lista.size} registros"
                        recycler.adapter = UsuarioAdapter(lista)

                    } else {
                        Toast.makeText(
                            this@VerUsuariosActivity,
                            "Error ${response.code()}",
                            Toast.LENGTH_LONG
                        ).show()
                        Log.e("API_ERROR", response.errorBody()?.string() ?: "")
                    }
                }

                override fun onFailure(call: Call<List<Usuario>>, t: Throwable) {
                    progressBar.visibility = View.GONE
                    Toast.makeText(this@VerUsuariosActivity, t.message, Toast.LENGTH_LONG).show()
                    Log.e("API_ERROR", t.message.toString())
                }
            })
    }
}


class UsuarioAdapter(private val lista: List<Usuario>) :
    RecyclerView.Adapter<UsuarioAdapter.UsuarioViewHolder>() {

    inner class UsuarioViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val txtAvatar  = view.findViewById<TextView>(R.id.txtAvatar)
        val txtNombre  = view.findViewById<TextView>(R.id.txtNombre)
        val txtEmail   = view.findViewById<TextView>(R.id.txtEmail)
        val txtRol     = view.findViewById<TextView>(R.id.txtRol)
        val dotEstado  = view.findViewById<View>(R.id.dotEstado)
        val txtEstado  = view.findViewById<TextView>(R.id.txtEstado)
        val txtId      = view.findViewById<TextView>(R.id.txtId)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UsuarioViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_usuario, parent, false)
        return UsuarioViewHolder(view)
    }

    override fun onBindViewHolder(holder: UsuarioViewHolder, position: Int) {
        val usuario = lista[position]

        val iniciales = usuario.nombre
            .split(" ")
            .take(2)
            .joinToString("") { it.first().uppercase() }
        holder.txtAvatar.text = iniciales

        holder.txtNombre.text = usuario.nombre
        holder.txtEmail.text  = usuario.email
        holder.txtRol.text    = usuario.rol
        holder.txtId.text     = "#${usuario.id_usuario}"

        if (usuario.estado.lowercase() == "activo") {
            holder.dotEstado.setBackgroundResource(R.drawable.circulo_verde)
            holder.txtEstado.text = "Activo"
        } else {
            holder.dotEstado.setBackgroundResource(R.drawable.circulo_rojo)
            holder.txtEstado.text = "Inactivo"
        }
    }

    override fun getItemCount() = lista.size
}