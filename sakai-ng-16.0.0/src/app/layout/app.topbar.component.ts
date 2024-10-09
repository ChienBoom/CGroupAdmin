import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { TranslateService } from '@ngx-translate/core';
import { WebSocketService } from '../demo/service/websocker-services/websocket.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
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
        public webSocketService: WebSocketService,
        private messageService: MessageService
    ) {
        this.webSocketService.startConnection();
        this.webSocketService.addReceiveMessageListener();
        this.webSocketService.ConfirmClientName();
        this.translate.setDefaultLang('vi');
    }

    ngOnInit(): void {
        this.webSocketService.messageReceived.subscribe((msg) => {
            this.toastMessage(
                'msg-toast',
                'info',
                'Thông báo',
                msg.message
            );
        });
    }

    handleChangeLanguage(event: any) {
        this.translate.use(event.value.code);
    }

    toastMessage(
        key: string,
        severity: string,
        title: string,
        message: string
    ) {
        this.messageService.add({
            key: key,
            severity: severity,
            summary: title,
            detail: message,
        });
    }
}
