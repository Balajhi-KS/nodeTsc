import * as zlib from 'zlib';


   const to = function (promise:any) {//global function that will help use handle promise rejections, this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
        return promise
            .then(data => {
                return [null, data];
            }).catch(err =>
                // [pe(err)]
                console.log(err)
                // parseBaseError(err)
            );
    }
   const TE = function (err_message, log) {
        if (log === true) {
            console.error(err_message);
        }

        throw new Error(err_message);
    }

   const ReE = function (res, err, code) {
        if (typeof err == 'object' && typeof err.message != 'undefined') {
            err = err.message;
        }

        if (typeof code !== 'undefined') res.statusCode = code;

        return res.json({ success: false, error: err });
    }

   const Reponse = function (res, data, code) {
        let send_data = { success: true };
        if (typeof data == 'object') {
            send_data = Object.assign(data, send_data);//merge the objects
        }
        const jsonString = JSON.stringify(send_data);

        zlib.gzip(jsonString, (err, buffer) => {
            if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (typeof code !== 'undefined') res.statusCode = code;

            res.set({
                'Content-Encoding': 'gzip',
                'Content-Type': 'application/json',
            });

            res.send(buffer);
        });
    };

export { TE, to, Reponse, ReE }

process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
process.on('uncaughtException', (error: Error) => {
    console.error(`Caught exception: ${error}\n` + `Exception origin: ${error.stack}`);
});