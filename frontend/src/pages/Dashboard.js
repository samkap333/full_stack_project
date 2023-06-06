import React from 'react';
import {useAuth} from '../components/Authcontext'


function Dashboard() {
    
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem('token');
    if (!isAuthenticated || !token) {
        return <p></p>;
    }
    return (
    <>
   
    <>
        <h1 classNameName="h3 mb-3"><strong>Dashboard</strong></h1>
        <br></br>
        <h5>Filter</h5>
        

<div className="dropdown">
  <button className="btn btn-primary dropdown-toggle custom-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Today
  </button>
  <div className="dropdown-menu custom-dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Filter</a>
  </div>
</div>
<br></br>

        <div className="row">
    <div className="col-xl-6 col-xxl-5 d-flex">
        <div className="w-100">
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                    <h3 className="card-title">Loan Received : 31</h3>
                                </div>
                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <i className="align-middle" data-feather="truck"></i>
                                    </div>
                                </div>
                            </div>
                            <h5 className="text-muted">Total Amount</h5>
                            <div className="mb-0">
                                
                            <h1 className="text-success font-weight-bold" style={{ fontWeight: '700' }}>RM 114118</h1>

                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                <h3 className="card-title">Loan Pending : 4 </h3>
                                </div>
                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <i className="align-middle" data-feather="users"></i>
                                    </div>
                                </div>
                            </div>
                            <h5 className="text-muted">Total Amount</h5>
                            <div className="mb-0">
                                
                            <h1 className="text-success font-weight-bold" style={{ fontWeight: '700' }}>RM 24631</h1>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                <h3 className="card-title">Loan Reviewed : 1</h3>
                                </div>
                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <i className="align-middle" data-feather="dollar-sign"></i>
                                    </div>
                                </div>
                            </div>
                            <h5 className="text-muted">Total Amount</h5>
                            <div className="mb-0">
                                
                            <h1 className="text-success font-weight-bold" style={{ fontWeight: '700' }}>RM 800</h1>

                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                <h3 className="card-title">Transferred: 1</h3>
                                </div>
                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <i className="align-middle" data-feather="shopping-cart"></i>
                                    </div>
                                </div>
                            </div>
                            <h5 className="text-muted">Total Amount</h5>
                            <div className="mb-0">
                                
                            <h1 className="text-success font-weight-bold" style={{ fontWeight: '700' }}>RM 10000</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="col-xl-6 col-xxl-5 d-flex">
        <div className="w-100">
            <div className="row">
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                <h3 className="card-title">Loan Approved : 11</h3>
                                </div>
                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <i className="align-middle" data-feather="dollar-sign"></i>
                                    </div>
                                </div>
                            </div>
                            <h5 className="text-muted">Total Amount</h5>
                            <div className="mb-0">
                                
                            <h1 className="text-success font-weight-bold" style={{ fontWeight: '700' }}>RM 500</h1>

                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col mt-0">
                                <h3 className="card-title">Loan Declined : 1</h3>
                                </div>
                                <div className="col-auto">
                                    <div className="stat text-primary">
                                        <i className="align-middle" data-feather="shopping-cart"></i>
                                    </div>
                                </div>
                            </div>
                            <h5 className="text-muted">Total Amount</h5>
                            <div className="mb-0">
                                
                            <h1 className="text-success font-weight-bold" style={{ fontWeight: '700' }}>RM 0</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


        <div className="row">
            <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
                <div className="card flex-fill w-100">
                    <div className="card-header">

                        <h5 className="card-title mb-0">Statistics:</h5>
                    </div>
                    <div className="card-body d-flex">
                        <div className="align-self-center w-100">
                            <div className="py-3">
                                <div className="chart chart-xs">
                                    <canvas id="chartjs-dashboard-pie"></canvas>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
              
            </div>
            <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
                <div className="card flex-fill">
                    <div className="card-header">

                        <h5 className="card-title mb-0">Loan Application:</h5>
                    </div>
                    <div className="card-body d-flex">
                        <div className="align-self-center w-100">
                            <div className="chart">
                                <div id="datetimepicker-dashboard"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </>
    
    
    </>
    )
}
export default Dashboard;

