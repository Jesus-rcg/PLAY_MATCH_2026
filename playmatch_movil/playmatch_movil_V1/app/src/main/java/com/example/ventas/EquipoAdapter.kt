package com.example.ventas.ui

import android.app.AlertDialog
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.example.ventas.R
import com.example.ventas.api.ApiClient
import com.example.ventas.model.Equipo
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class EquipoAdapter(
    private val listaEquipos: MutableList<Equipo>
) : RecyclerView.Adapter<EquipoAdapter.EquipoViewHolder>() {

    class EquipoViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvNombre: TextView = itemView.findViewById(R.id.tvNombreEquipo)
        val tvEntrenador: TextView = itemView.findViewById(R.id.tvEntrenador)
        val btnEliminar: ImageButton = itemView.findViewById(R.id.btnEliminar)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EquipoViewHolder {
        val vista = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_equipo, parent, false)
        return EquipoViewHolder(vista)
    }

    override fun onBindViewHolder(holder: EquipoViewHolder, position: Int) {
        val equipo = listaEquipos[position]
        holder.tvNombre.text = equipo.nombre
        holder.tvEntrenador.text = "Entrenador: ${equipo.entrenador}"

        // Al tocar la tarjeta abre EditarEquipoActivity
        holder.itemView.setOnClickListener {
            val context = holder.itemView.context
            val intent = Intent(context, EditarEquipoActivity::class.java)
            intent.putExtra("EQUIPO_ID", equipo.id_equipo)
            intent.putExtra("EQUIPO_NOMBRE", equipo.nombre)
            intent.putExtra("EQUIPO_ENTRENADOR", equipo.entrenador)
            context.startActivity(intent)
        }

        // Al tocar el basurero muestra confirmación
        holder.btnEliminar.setOnClickListener {
            val context = holder.itemView.context
            AlertDialog.Builder(context)
                .setTitle("Eliminar equipo")
                .setMessage("¿Estás seguro que deseas eliminar ${equipo.nombre}?")
                .setPositiveButton("Sí, eliminar") { _, _ ->
                    eliminarEquipo(context, equipo, position)
                }
                .setNegativeButton("Cancelar", null)
                .show()
        }
    }

    private fun eliminarEquipo(context: android.content.Context, equipo: Equipo, position: Int) {
        val prefs = context.getSharedPreferences("app", android.content.Context.MODE_PRIVATE)
        val token = prefs.getString("token", "") ?: ""

        ApiClient.instance.deleteEquipo(
            "Bearer $token",
            equipo.id_equipo
        ).enqueue(object : Callback<Void> {

            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                if (response.isSuccessful) {
                    listaEquipos.removeAt(position)
                    notifyItemRemoved(position)
                    Toast.makeText(context, "Equipo eliminado correctamente", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(context, "Error al eliminar", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<Void>, t: Throwable) {
                Toast.makeText(context, "Error de conexión", Toast.LENGTH_SHORT).show()
            }
        })
    }

    override fun getItemCount(): Int = listaEquipos.size
}