import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { TranslateService } from '@ngx-translate/core';
import { WebSocketService } from '../demo/service/websocker-services/websocket.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    languages: any[] = [
        { id: 1, name: 'VN', code: 'vi' },
        { id: 2, name: 'EN', code: 'en' },
    ];

    selectedState: string = 'VN';

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private translate: TranslateService,
        public webSocketService: WebSocketService
    ) {
        this.webSocketService.startConnection();
        this.webSocketService.addReceiveMessageListener();
        this.webSocketService.ConfirmClientName();
        this.translate.setDefaultLang('vi');
    }

    handleChangeLanguage(event: any) {
        this.translate.use(event.value.code);
    }
}
