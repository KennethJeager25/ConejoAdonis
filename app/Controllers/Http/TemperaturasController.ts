import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Temperatura from 'App/Models/Temperatura';
import Database from '@ioc:Adonis/Lucid/Database';


export default class TemperaturasController {

    public async InsertAllDataSensor({response, request}:HttpContextContract) {

            await Database.rawQuery("DELETE FROM temperaturas")
            await axios.get('https://thingspeak.com/channels/935349/field/1.json')
                .then((r) => {
                    const x = r.data.feeds
                    Temperatura.createMany(x)
            }).catch((m)=>{
                response.badRequest({message:"no existen registros"})
            });
            response.ok({message:"Registrados correctamente"})
    }
    public async MostrarInfo({response}:HttpContextContract){

        try{
            const temp = await Temperatura.all()
            response.ok({message:"datos",data:temp})
        }
        catch(error){
            response.badRequest({message:"error al mostrar"})
        }
    }
    
    public async EliminarTodo({response}:HttpContextContract){

        try{
            await Database.rawQuery("DELETE FROM Temperaturas")
            response.ok({message:"Eliminado correctamente"})
        }
        catch(error){
            response.badRequest({message:"No existen datos"})
        }
    }


}
