import 'package:flutter/material.dart';
import 'package:mmamc_2/screens/signup_screen.dart';
import 'package:mmamc_2/widgets/custom_text_form_field_widget.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}


class _LoginScreenState extends State<LoginScreen> {
  final _key = GlobalKey<FormState>();
  final TextEditingController emailtexteditingController = TextEditingController();
  final TextEditingController passwordeditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      appBar: AppBar(
        leading: Icon(Icons.arrow_back_ios, color: Colors.black,),
  
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          spacing: 10,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
         Row(
          spacing: 10,
          children: [
           Text('Login', style: TextStyle(fontSize: 30),),
           Icon(Icons.star, size: 32, color: Colors.yellow,),
         ],),
         Text('Welcome Back! please enter your details',style: TextStyle(color: Colors.grey),),
         Text('Email', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20 ),),
         CustomTexFormField(
          validation: (value){
            if(value == null || value.isEmpty){
              return 'please enter your email';
            }
            return null;
          },
           textEditingController: emailtexteditingController,
           prefixIcon: Icons.email,
          hintText: "Enter your Email",
         ),
         SizedBox(height: 10,),
         Text('Password', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20 ),),
         CustomTexFormField(
          validation: (value){
            if (value == null ||value.isEmpty){
              return 'please enter your password';
            }
            if(value.length < 8){
              return 'password must be 8 characters';
            }
            return null;
          },
          textEditingController: passwordeditingController,
          suffixIcon: Icons.visibility,
          prefixIcon: Icons.lock,
          hintText: "Enter your Password",
         ),
         SizedBox(height: 10,),


         Row(
          mainAxisAlignment: .spaceBetween,
          children: [
            Row(children: [
 Checkbox(value: true, onChanged: (v){},),
          Text('Remember for 30 days'),
            ],),
           
           Text('Forget Password', style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold),),
         ],),
         GestureDetector(
           onTap: (){
            var email = emailtexteditingController.text;
            var Password = passwordeditingController.text;
            print('final email is $email and password is $Password');
           },
           child: Container(
            alignment: .center,
            width: MediaQuery.sizeOf(context).width,
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
            color: Colors.blue,
            borderRadius: BorderRadius.circular(12),
           ),
           child: Text('Login', style: TextStyle(color: Colors.white, fontSize: 20),),
           ),
         ),
         SizedBox(height: 10,),
         Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
          Container(
            color: Colors.amber,
            height: 2,
            width: MediaQuery.sizeOf(context).width*0.20,
          ),
             Text('Or login with'),
             Container(
            color: Colors.black,
            height: 2,
            width: MediaQuery.sizeOf(context).width*0.20,
          ),
          ],
         ),
          SizedBox(height: 10,),

        
             Row(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 20,
              children: [
                Container(
                  padding: EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(Icons.apple, size: 28, color: Colors.black,),
                ),
                 Container(
                  padding: EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                  ),
                    child: Icon(Icons.g_mobiledata_rounded, size: 28, color: Colors.red,),
                 ),
               Container(
                 alignment: .center,
                 padding: EdgeInsets.all(16),
                 decoration: BoxDecoration(
                   color: Colors.white,
                   borderRadius: BorderRadius.circular(12),
                 ),
                 child: Icon(Icons.facebook, size: 28, color: Colors.blue,),
               ),
              ],
             ),
              
         SizedBox(height: 10,),

         // dont have an account
         Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
             Text('Don\'t have an account?'),
             Text('Sign up', style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold),),
           
             
          ],
         ),
         SizedBox(height: 10,),

        ],),
      ),
    );
  }
}