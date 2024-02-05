import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ResourceService, ConfigService, NavigationHelperService,IUserData, ToasterService } from '@sunbird/shared';
import { FrameworkService, PermissionService, UserService } from '@sunbird/core';
import { IImpressionEventInput } from '@sunbird/telemetry';
import { WorkSpaceService } from './../../services';
@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html'
})
export class CreateContentComponent implements OnInit, AfterViewInit {

  /*
 roles allowed to create textBookRole
 */
  textBookRole: Array<string>;
  /**
    * lessonRole   access roles
  */
  lessonRole: Array<string>;
  /**
 * collectionRole  access roles
 */
  collectionRole: Array<string>;
  /**
  *  lessonplanRole access roles
  */
  lessonplanRole: Array<string>;
  /**
  *  lessonplanRole access roles
  */
  contentUploadRole: Array<string>;
  /**
   * courseRole  access roles
  */
  courseRole: Array<string>;
 /**
   * assesment access role
   */
  assessmentRole: Array<string>;
  /**
   * To call resource service which helps to use language constant
   */
  public resourceService: ResourceService;
  /**
   * Reference for framework service
  */
  public frameworkService: FrameworkService;

  /**
   * reference of permissionService service.
  */
  public permissionService: PermissionService;
  /**
  * reference of config service.
 */
  public configService: ConfigService;

  userRoles:any;
  creatorUploadQues:boolean = false;
  /**
	 * telemetryImpression
	*/
  telemetryImpression: IImpressionEventInput;
  public enableQuestionSetCreation;
  public enableWorkspaceList;
  /**
  * Constructor to create injected service(s) object
  *
  * Default method of DeleteComponent class

  * @param {ResourceService} resourceService Reference of ResourceService
 */
  constructor(configService: ConfigService, resourceService: ResourceService,
    frameworkService: FrameworkService, permissionService: PermissionService,
    private activatedRoute: ActivatedRoute, public userService: UserService,
    public navigationhelperService: NavigationHelperService,
    public workSpaceService: WorkSpaceService,
    private router:Router,
    private toasterService: ToasterService) {
    this.resourceService = resourceService;
    this.frameworkService = frameworkService;
    this.permissionService = permissionService;
    this.configService = configService;
  }

  ngOnInit() {
    this.frameworkService.initialize();
    this.textBookRole = this.configService.rolesConfig.workSpaceRole.textBookRole;
    this.lessonRole = this.configService.rolesConfig.workSpaceRole.lessonRole;
    this.collectionRole = this.configService.rolesConfig.workSpaceRole.collectionRole;
    this.lessonplanRole = this.configService.rolesConfig.workSpaceRole.lessonplanRole;
    this.contentUploadRole = this.configService.rolesConfig.workSpaceRole.contentUploadRole;
    this.assessmentRole = this.configService.rolesConfig.workSpaceRole.assessmentRole;
    this.courseRole = this.configService.rolesConfig.workSpaceRole.courseRole;
    this.workSpaceService.questionSetEnabled$.subscribe(
      (response: any) => {
        this.enableQuestionSetCreation = response.questionSetEnablement;
      }
    );
    this.workSpaceService.workspaceListEnabled$.subscribe(
      (response: any) => {
        this.enableWorkspaceList = response.workspaceSetEnablement;
      }
    );
    this.getUserRole()
  }

  getUserRole(){
    this.userService.userData$.subscribe((user: IUserData) =>{
      if(user && !user.err){
       console.log('useeerr',user.userProfile)
       this.creatorUploadQues =  user.userProfile?.userRoles?.includes('CONTENT_CREATOR')
      }
      else if(user && user.err){
        this.toasterService.error(this.resourceService.messages.emsg.m0005 || 'Something went wrong, please try again later...');
      }
    })
  }
 

  navigateTo(){
    this.router.navigate(['/workspace/uploadQues'])
  }

  ngAfterViewInit () {
    setTimeout(() => {
      this.telemetryImpression = {
        context: {
          env: this.activatedRoute.snapshot.data.telemetry.env
        },
        edata: {
          type: this.activatedRoute.snapshot.data.telemetry.type,
          pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
          uri: this.activatedRoute.snapshot.data.telemetry.uri,
          duration: this.navigationhelperService.getPageLoadTime()
        }
      };
    });
  }
}
