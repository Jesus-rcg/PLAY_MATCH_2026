package com.example.ventas
import android.os.Bundle
import android.widget.EditText
import android.widget.Button
import android.widget.Toast
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.example.ventas.api.ApiClient
import com.example.ventas.model.Jugador
import retrofit2.Call
import retrofit2.Response

class JugadoresActivity : AppCompatActivity() {

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_jugadores)

            val txtId_jugador = findViewById<EditText>(R.id.)
            val txtNombre = findViewById<EditText>(R.id.txtNombre)
            val txtApellido = findViewById<EditText>(R.id.Apellido)
            val txtDocumento = findViewById<EditText>(R.id.txtDocumento)
            val txtNumero_camiseta = findViewById<EditText>(R.id.Numero_camiseta)
            val txtEstado = findViewById<EditText>(R.id.txtEstado)



            val btnGuardar = findViewById<Button>(R.id.btnGuardar)
            val btnBuscar = findViewById<Button>(R.id.btnBuscar)
            val btnEditar = findViewById<Button>(R.id.btnEditar)
            val btnEliminar = findViewById<Button>(R.id.btnEliminar)

            btnGuardar.setOnClickListener {

                val jugador = Jugador(

                    id_jugador = txtId_jugador.text.toString(),
                    nombre = txtNombre.text.toString(),
                    apellido = txtApellido.text.toString(),
                    documento = txtDocumento.text.toString(),
                    nuemero_camiseta = txtNumero_camiseta.text.toString(),
                    estado = txtEstado.text.toString(),

                )

                val prefs = getSharedPreferences("app", MODE_PRIVATE)

                val token = prefs.getString("token", "") ?: ""

                ApiClient.instance.createJugador(
                    "Bearer $token",
                    jugador
                ).enqueue(object: retrofit2.Callback<Jugador>{

                    override fun onResponse(call: Call<Jugador?>, response: Response<Jugador?>)
                    {
                        if (response.isSuccessful){
                            Toast.makeText(
                                this@JugadoresActivity,
                                "jugador guardado correctamente.",
                                Toast.LENGTH_LONG
                            ).show()



                        } else {
                            Toast.makeText(
                                this@JugadoresActivity,
                                "Error: ${response.code()}",
                                Toast.LENGTH_LONG
                            ).show()

                            Log.e("API_ERROR", response.errorBody()?.string() ?: "Error")
                        }


                    }

                    override fun onFailure(call: retrofit2.Call<Jugador?>, t: Throwable) {
                        Toast.makeText(
                            this@JugadoresActivity,
                            t.message,
                            Toast.LENGTH_LONG
                        ).show()

                        Log.e("API_ERROR", t.message.toString())
                    }
                })


            }


            //Buscar
            btnBuscar.setOnClickListener {
                Toast.makeText(this, "Buscar jugador", Toast.LENGTH_SHORT).show()

                //Editar
                btnEditar.setOnClickListener {
                    Toast.makeText(this, "Jugador editado", Toast.LENGTH_SHORT).show()
                }
                //Eliminar
                btnEliminar.setOnClickListener {
                    Toast.makeText(this, "Jugador eliminado", Toast.LENGTH_SHORT).show()
                }

            }
        }
    }


}