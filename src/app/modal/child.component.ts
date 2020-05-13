import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from "@angular/core";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html"
})
export class ChildComponent implements OnInit {
  public itemId: number;

  private modalRef: NgbModalRef;
  @ViewChild("childmodal", { static: false }) child: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  open(id: number) {
    this.itemId = id;
    this.modalRef = this.modalService.open(this.child);
    this.modalRef.result.then(result => { }, reason => { });
  }

  hideModal() {
    this.modalRef.close();
  }
}
