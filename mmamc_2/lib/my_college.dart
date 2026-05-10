import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mmamc_2/widgets/custom_widget.dart';

class MyCollege extends StatelessWidget {
  const MyCollege({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
    appBar: AppBar(
      backgroundColor: Colors.deepPurple,
      centerTitle: true,
      title: const Text('MMAMC', style: TextStyle(color: Colors.white),),
      actions: [
        Icon(Icons.settings, color: Colors.deepOrangeAccent, size: 42),
        Icon(Icons.home, color: Colors.deepOrangeAccent, size: 42),
      ],
    ),
    drawer: Drawer(
      child: ListView(
        children: [
          DrawerHeader(child: Column(
            spacing: 20,
            children: [CircleAvatar(
              radius: 32,
              backgroundImage: NetworkImage('https://unsplash.com/photos/person-working-on-laptop-at-wooden-table-with-breakfast-s_JJOnsIChs'),),
            Text('Sabin'),
            
            
           
            ],
              

          )),
        ListTile(
          leading: Icon(Icons.settings, size: 30, color: Colors.blue,),
          title: Text('Setting'),
          subtitle: Text('You can change your settings'),


        ),
          ListTile(
          leading: Icon(Icons.sunny, size: 30, color: Colors.blue,),
          title: Text('Theme'),
          subtitle: Text('You can change your theme'),


        ),  ListTile(
          leading: Icon(Icons.more, size: 30, color: Colors.blue,),
          title: Text('Setting'),
          subtitle: Text('More setting'),


        ),
        ],
      ),
    ),
body: SingleChildScrollView(
  padding: EdgeInsets.all(16),
  child: Column(
    spacing: 20,
    children: [
      Container(
    
        padding: EdgeInsets.all(12),
        decoration: BoxDecoration(color: Colors.deepPurple, borderRadius: BorderRadius.circular(12)),
        child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          
        Text("welcome to college app", style:TextStyle(fontSize: 20, color: Colors.white,fontFamily: 'Roboto'),),
        Text('Learn more about college app', style: TextStyle(fontSize: 20, color: Colors.white, fontFamily: 'Roboto'),),
       
            ],),
      ),
      Image.asset('assets/tea.png'),
   
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
     
      children: [
         Customwidget(
          onTap: () {
            print("search");
          },
          icon: Icons.search,color:Colors.deepPurple,),
         Customwidget(
          onTap: () {
            print("favorite");
          },
          icon: Icons.favorite,color:Colors.deepPurple,),
         Customwidget(
              onTap: () {
            print("notifications");
          },
            icon: Icons.notifications,color:Colors.deepPurple,),
      ],
    ),
     
    SizedBox(height: 20,),
   ElevatedButton(onPressed: (){}, child: Text('press me'),),
     ],
     
  
  ),
  
),
    );
  }
}
