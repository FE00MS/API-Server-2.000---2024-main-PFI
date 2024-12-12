class Users_API{
    static Host_URL() { return "http://localhost:5000"; }
    static USERS_API_URL() { return this.Host_URL() + "/accounts" };

    static initHttpState() {
        this.currentHttpError = "";
        this.currentStatus = 0;
        this.error = false;
    }

    static setHttpErrorState(xhr) {
        if (xhr.responseJSON)
            this.currentHttpError = xhr.responseJSON.error_description;
        else
            this.currentHttpError = xhr.statusText == 'error' ? "Service introuvable" : xhr.statusText;
        this.currentStatus = xhr.status;
        this.error = true;
    }

    static async Save(data) {
        Users_API.initHttpState();
        
        return new Promise(resolve => {
            $.ajax({
                url:this.USERS_API_URL()  + '/register'   ,
                type: 'POST' ,
                contentType: 'application/json',
                data: JSON.stringify(data),
                
                success: (data) => { resolve(data); },
                error: (xhr) => { Users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }
    static async Edit(data,token ) {
        Users_API.initHttpState();
        
        return new Promise(resolve => {
            $.ajax({
                url:   this.USERS_API_URL() +'/modify',
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data),
                headers: {
                    'authorization': `Bearer ${token}` // Ajoutez l'en-tête Authorization
                },
                success: (data) => { resolve(data); },
                error: (xhr) => { Users_API.setHttpErrorState(xhr); resolve(null); }
            });
        });
    }

    static async Connexion(data) {
        Users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url:   this.Host_URL() + "/token",
                type:    "POST" ,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: (data) => { resolve(data); },
                error: (xhr) => { Users_API.setHttpErrorState(xhr); resolve(xhr.status); }
            });
        });
    }
    static async Logout(data) {
        Users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url:   this.USERS_API_URL() + "/logout?userId=" +data.id ,
                type:    "GET" ,
                success: (data) => { resolve(data); },
                error: (xhr) => { Users_API.setHttpErrorState(xhr); resolve(xhr.status); }
            });
        });
    }
 
    
    static async VerifyCode(data) {
        Users_API.initHttpState();
        return new Promise(resolve => {
            $.ajax({
                url:   this.USERS_API_URL() + "/verify?id=" +data.id +"&code=" +data.VerificationCode,
                type:    "GET" ,
                success: (data) => { resolve(data); },
                error: (xhr) => { Users_API.setHttpErrorState(xhr); resolve(xhr.status); }
            });
        });
    }

}