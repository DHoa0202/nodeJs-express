import fs from 'fs';
import multer from 'multer';
import util from '../../model/util/util.js'
import storage from '../../model/util/storage.js'

const routes = storage.breadcumb.concat({ href: '#upload', name: 'Upload file' });
const upload = multer({ dest: 'src/app_static/uploads' });
var arr = [];

function render(res, add) {
    return res.render('', Object.assign({ routes: routes, page: 'pages/upload' }, add));
}

export default (app) => app
    .get('/uploads', (_req, res) => {
        let directory = fs.realpathSync('./src/app_static/uploads');
        fs.readdirSync(directory).map(filename => arr.push({
            filename: filename, path: `/uploads/${filename}`
        }))
        return render(res, { data: arr });
    })
    .use('/delete/:filename', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'POST, GET');
        try {
            let directory = fs.realpathSync('./src/app_static/uploads');
            let filename = req.params['filename'];
            fs.unlinkSync(`${directory}/${filename}`)
            util.delete(arr, filename, 'filename');
        } catch (error) {
            console.error(error);
        } finally {
            return render(res, { data: arr });
        }
    })
    .post('/uploads', upload.any(), (req, res) => {
        req['files'].forEach(({ filename }) => arr.push({
            filename: filename, path: `/uploads/${filename}`
        }));
        return render(res, { data: arr });
    })


