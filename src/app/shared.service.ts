import { Injectable } from '@angular/core';
import {ILoginUserDetails} from './app.interface';
@Injectable()
export class SharedService {
    // tslint:disable-next-line:max-line-length
    public user_data: IUserData = { user_name: 'Test KM', email: 'km@merilytics.com', role_id: 1, LastLoginDatetime: new Date() };
    public loading_panel = false;
    public notification_status = false;
    public sub_menu_activated_url;
    public notification_data;
    public side_nav_opened = false;
    public active_candidate_menu_icon = false;
    public candidate_nav_opened = false;
    public hideRequiredMarker = false;
    public is_candidate = false;
    public postdata = [] ;
    public selecteddomainsubscription: boolean;
    public login_user_details: ILoginUserDetails = { user_id: null, user_name: null, email_id: null};
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    // tslint:disable-next-line:quotemark
    public dateFormat = "MMM dd, yyyy";
    public dateFormatWithTime = 'MMM d, y, h:mm:ss a';
    weekendDisabled = (d: Date): boolean => {
        const day = d.getDay();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
    }
    is_candidate_change(state) { this.is_candidate = state; }
    notification_status_change(state) { this.notification_status = state; }
    notification_data_change(data) { this.notification_data = data; }
    user_data_change(UData) { this.user_data = UData; }
    loading_panel_change(status: boolean) { this.loading_panel = status; }
    menu_activated_url_change(path: string) { this.sub_menu_activated_url = path; }
    active_candidate_menu_icon_change(status) { this.active_candidate_menu_icon = status; }
    keyPressDecimal(event: any) {
        const pattern = /^\d*(\.\d{0,2})?$/;
        const inputChar = String.fromCharCode(event.charCode);
        if ((!(event.keyCode >= 37 && event.keyCode <= 40) && event.keyCode !== 8 && !pattern.test(inputChar))) {
            event.preventDefault();
        }
    }
    postChange(postdataresponse: any) {
        this.postdata = postdataresponse;
    }
    subscriptionchanged(status: any) {
        this.selecteddomainsubscription = status;
    }
    loginUserDetails(result: any) {
        this.login_user_details = result;
    }
    keyPress(event: any) {
        const pattern = /[0-9\+\-\ ]/;
        const inputChar = String.fromCharCode(event.charCode);
        if ((!(event.keyCode >= 37 && event.keyCode <= 40) && event.keyCode !== 8 && !pattern.test(inputChar))) {
            event.preventDefault();
        }
    }
    hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            // tslint:disable-next-line:no-shadowed-variable
            const hue2rgb = (p, q, t) => {
                if (t < 0) { t += 1; }
                if (t > 1) { t -= 1; }
                if (t < 1 / 6) { return p + (q - p) * 6 * t; }
                if (t < 1 / 2) { return q; }
                if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
}
export interface IUserData {
    user_name: string;
    LastLoginDatetime?: Date;
    role_id: number;
    email: string;
}
