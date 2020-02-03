import { isDate } from 'moment';

class LocalStorage {
    get(key) {
        const { value = null, expiration = null } = JSON.parse(localStorage.getItem(key) || '{}');
        if((!expiration && !!value) || (new Date(expiration) > new Date())){
            return value;
        }
        this.remove(key);
        return null;
    }

    set(key, value, { hour = null, minute = null, seconds = null }) {
        if (!hour && !minute && !seconds)
        {
            localStorage.setItem(key, JSON.stringify({ value: value }));
        }
        else {
            const exp = new Date();
            if (typeof hour === 'number') exp.setHours(exp.getHours() + hour);
            if (typeof minute === 'number') exp.setMinutes(exp.getMinutes() + minute);
            if (typeof seconds === 'number') exp.setSeconds(exp.getSeconds() + seconds);
            localStorage.setItem(key, JSON.stringify({ expiration: exp.toString(),value: value }));
        }
    }

    refresh(key, { hour = null, minute = null, seconds = null }) {
        try {
            const value = this.get(key);
            if (!value) return false;
            this.set(key, value, { hour, minute, seconds });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}

class SessionStorage {
    get(key) {
        const { value = null, expiration = null } = SessionStorage.getItem(key);
        if (!value && !expiration) {
            this.remove(key);
            return null;
        }
        if (!expiration) return value;
        if (!isDate(expiration)) {
            this.remove(key);
            return null;
        }
        if (new Date() < new Date(expiration)) {
            this.remove(key);
            return null;
        }
        return value;
    }

    set(key, value, { hour = null, minute = null, seconds = null }) {
        if (!hour && !minute && !seconds) SessionStorage.setItem(key, { value });
        else {
            const exp = new Date();
            if (typeof hour === 'number') exp.setHours(exp.getHours() + hour);
            if (typeof minute === 'number') exp.setMinutes(exp.getMinutes() + minute);
            if (typeof seconds === 'number') exp.setSeconds(exp.getSeconds() + seconds);
            SessionStorage.setItem(key, { value, expiration: exp.toDateString() });
        }
    }

    remove(key) {
        SessionStorage.removeItem(key);
    }

    clear() {
        SessionStorage.clear();
    }
}

export const Local = new LocalStorage();
export const Session = new SessionStorage();
