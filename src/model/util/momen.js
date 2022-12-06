import moment from 'moment';
moment.locale('vi')

export default (time, pattern) => {
    return moment(time).format(pattern);
}