import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TabService } from '../../services/tab.service';

@Component({
  selector: 'ngx-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  isLoading = false
  
  private currentTab: any

  constructor(private tabService: TabService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tabService.getCurrentTab().subscribe(tab => {
      this.currentTab = tab
    })
  }

  isTabActive(tab: any): boolean {
    return this.currentTab === tab
  }

  onChangeTab(event: any): void {
    this.tabService.setCurrentTab(event.tabId)
  }
}
