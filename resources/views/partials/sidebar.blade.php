<aside class="main-sidebar">
    <section class="sidebar">
        <div class="user-panel">
            <div class="info text-center">
                <p>{{ auth()->user()->nama_lengkap }}</p>
                <span class="role">Employee</span>
            </div>
        </div>
        <ul class="sidebar-menu">
            <li>
                <a href="pages/widgets.html">
                    <i class="fa fa-fw fa-th"></i> <span>Dashboard</span>
                </a>
            </li>
            @if (auth()->user()->role == 'super_admin')
                <li class="treeview item-active">
                    <a href="#">
                        <i class="fa fa-fw fa-database"></i> <span>Manage Data</span> <i class="fa fa-angle-down pull-right"></i>
                    </a>
                    <ul class="treeview-menu menu-open" style="display: block;">
                        <li><a href="/user"><i class="fa fa-fw"></i>Data User</a></li>
                        <li><a href="/kota"><i class="fa fa-fw"></i>Data Kota</a></li>
                        <li><a href="/prospek"><i class="fa fa-fw"></i>Data Prospek</a></li>
                        <li><a href="/project"><i class="fa fa-fw"></i>Data Project</a></li>
                    </ul>
                </li>
            @endif
        </ul>
    </section>
</aside>
