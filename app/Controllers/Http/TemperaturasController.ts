import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios';
import Temperatura from 'App/Models/Temperatura';
import Database from '@ioc:Adonis/Lucid/Database';


export default class TemperaturasController {

    public async InsertAllDataSensor({response}:HttpContextContract) {

        try{
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
        catch(error){
            response.badRequest({message:"error al registrar"})
        }
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

    public async MostrarTemperatura({response}:HttpContextContract){

        try{
            const tempe = await Database.rawQuery("SELECT * FROM temperaturas ORDER BY id DESC LIMIT 1")
            response.ok({message:"Dato existente",data:tempe})
        }
        catch(error){
            response.badRequest({message:"No existen datos"})
        }

    }

    public async ContarRegistros({response}:HttpContextContract){
        try{
            const temp = await Database.rawQuery("SELECT count(*) FROM temperaturas")
            response.ok({message:"Dato existente",data:temp})
        }
        catch(error){
            response.badRequest({message:"No existen datos"})
        }
    }

    public async Ultimos10Registros({response}:HttpContextContract){
        try{
            const temperatura = await Database.rawQuery("SELECT * FROM temperaturas ORDER BY id DESC LIMIT 10")
            response.ok({message:"Dato existente",data:temperatura})
        }
        catch(error){
            response.badRequest({message:"No existen datos"})
        }
    }


}
