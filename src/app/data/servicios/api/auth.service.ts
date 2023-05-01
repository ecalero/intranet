import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERRORS_CONST, SERVICIO_URL } from '@data/constantes';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constantes/routes';
import { IApiUserAuthenticated } from '@data/interfaces';
import { Tokens } from '@data/interfaces/api/tokens.metadata';
import { ICatalogoTabla } from '@data/interfaces/tabla/catalogotablas.metadata';
import { ITabTablas } from '@data/interfaces/tabla/tabtablas.metadata';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, ignoreElements, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*nuevo Token Interceptor*/
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string ="";
  /* fin */
  public currentUser: BehaviorSubject<IApiUserAuthenticated>;
  public nameUserLS = 'currentUser';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS) || '{}')
    );
  }

  get getUser(): IApiUserAuthenticated {
    //console.log("estoy en auth service");
    //console.log(this.currentUser.value);
    return this.currentUser.value;
  }

  login(
    data: {
      correo: string;
      clave: string;
    }
  ): Observable <{
    success: boolean;
    mensaje: string;
    usuario: any;
    parametros: any;
  }> {
    //console.log("estoy en el servicio ....");
    const params = new HttpParams({
      fromObject: data
    });
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    const response = { success: true, mensaje: ERRORS_CONST.LOGIN.ERROR, usuario: null, parametros: null};
    //return this.http.post<{error: boolean, msg: string, data: any}>(SERVICIO_URL.SLIM4.USUARIOS.LOGIN, data)
    return this.http.post<{success: boolean, mensaje: string, usuario: any, parametros:any}>(SERVICIO_URL.SLIM4.DOMINIO+SERVICIO_URL.SLIM4.USUARIOS.LOGIN,params, {headers: headers})
      .pipe(
        map(r => {
          response.mensaje = r.mensaje;
          response.success = r.success;
          response.usuario = r.usuario.data;
          response.parametros = r.parametros;


          this.setUserToLocalStorage(r.usuario.data);
          this.setParametrosStorage(r.parametros);

          this.currentUser.next(r.usuario.data);
         let tokens: Tokens = {jwt: r.usuario.data.ACCESS_TOKEN, refreshToken: r.usuario.data.ACCESS_TOKEN };
          this.doLoginUser(r.usuario.data.USUARIO, tokens)
          if (!response.success) {
            this.router.navigateByUrl(INTERNAL_ROUTES.INTRANET_USER_LIST);
          }
          return response;

        }),
        catchError( e => {
          return of(response);
        })
      );

      /*
      return this.http.post(SERVICIO_URL.SLIM4.USUARIOS.LOGIN,params, {headers: headers}).pipe(
        map(res=> res),
        tap(res => {
          console.log('devuelve datos de acceso');
          console.log(res);
          this.accesos=res;
          //this.setLocalData('login-'+login.usuario, res);
          //this.setLocalData('login', res);
        })
      )*/

  }

  logout() {
    //console.log(this.nameUserLS);
    localStorage.removeItem(this.nameUserLS);
return false;
    this.currentUser.next({
      IDUSUARIO: 0,
      USUARIO: '',
      IDPERSONA: 0,
      ESTADO: 0,
      BAJA: 0,
      NROINTENTOS: 0,
      TIPODOCUMENTO: 0,
      NRODOCUMENTO: 0,
      NOMBRES: '',
      APELLIDO_PATERNO: '',
      APELLIDO_MATERNO: '',
      FOTO: '',
      FECHA_NACIMIENTO: '',
      GENERO: '',
      FECHA_REGISTRO: '',
      TIPO_PERSONA: 0,
      ACCESS_TOKEN: ''
    });
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
  }


  private setUserToLocalStorage( user: IApiUserAuthenticated) {
    localStorage.setItem(this.nameUserLS, JSON.stringify(user));
  }

  private setParametrosStorage( catalogoTablas: ICatalogoTabla) {
    localStorage.setItem("parametros", JSON.stringify(catalogoTablas));
  }

  /*agregando para tokenInterceptor */
  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(SERVICIO_URL.SLIM4.USUARIOS.TOKEN.REFRESH, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    let usuario= this.currentUser.value;
    //console.log("getToken--->");
    //console.log(usuario);
    return localStorage.getItem("JWT_TOKEN");
  }


  getParametrosById(IDCATALOGOTABLAS:number) {
    const parametros: Array<ICatalogoTabla> = JSON.parse(localStorage.getItem("parametros") || '{}');
    console.log()
    //return parametros;
    return parametros.find(element => element["IDCATALOGOTABLAS"] === IDCATALOGOTABLAS);
    //return parametros.find(obj => obj.IDCATALOGOTABLAS === IDCATALOGOTABLAS);
  }



   private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = "";
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
