import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    // destino do arquivo: caminho absoluto + .. nivel acima de diretorio +
    // outro nivel acima de diretorio + pasta tmp + pasta uploads
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // parametros: dados da requisicao -> req; dados do arquivo -> file;
    // dados do callback function -> cb pode ser erro ou os dados da requisicao

    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        // se callback der erro, funcao cb vai retornar o erro
        if (err) return cb(err);
        // caso não tenha erros, parametro de erro da funcao callback será null
        // segundo parametro será para criar identificador unico para a imagem
        // ex: u11u3g7238ji.png
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
