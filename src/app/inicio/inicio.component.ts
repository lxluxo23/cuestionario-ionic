import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  preguntaActual = 0;
  respuestas = [];
  preguntas: any[] = [];

  constructor(
    private alertCtrl: AlertController,
  ) {
    axios.get('assets/preguntas.json').then(res => {
      console.log(res)
      this.preguntas = res.data
    })

  }

  ngOnInit() {
  }

  async selectOption(option: any) {
    console.log("entro a la funcion")
    this.respuestas.push(option);
    this.preguntaActual++;
    if (this.preguntaActual >= this.preguntas.length) {

      const alert = await this.alertCtrl.create({
        header: '¡Ya has respondido todas las preguntas!',
        message: 'Gracias por participar.',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              App.exitApp()
              console.log('las respuestas ' + this.respuestas)
            }
          }

        ],
      });
      await alert.present()
    }
  }
}
