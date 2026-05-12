// import 'package:flutter/material.dart';
// import 'package:mmamc_2/screens/login_screen.dart';
// import 'package:mmamc_2/widgets/custom_text_form_field_widget.dart';

// class SignupScreen extends StatelessWidget {
//   const SignupScreen({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return  Scaffold(
//       appBar: AppBar(
//         leading: Icon(Icons.arrow_back_ios, color: Colors.black,),
  
//       ),
//       body: SingleChildScrollView(
//         padding: const EdgeInsets.all(16),
//         child: Column(
//           spacing: 10,
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Row(
//               spacing: 10,
//               children: [
//                 Text('Create an account', style: TextStyle(fontSize: 30),),
//                 Icon(Icons.star, size: 32, color: Colors.yellow,),

//               ],
//             ),
//             Text('Welcome!! please enter your details',style: TextStyle(color: Colors.grey),),
//             Text('Name', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20 ),),
//              const CustomTexFormField(
//               prefixIcon: Icons.person,
//               hintText: 'Enter your name',
//             ),
//             SizedBox(height: 10,),
//             Text('Email', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20 ),),
//              const CustomTexFormField(
//               prefixIcon: Icons.email,
//               hintText: 'Enter your Email',
//             ),
//             SizedBox(height: 10,),
//             Text('Password', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20 ),),
//              const CustomTexFormField(
//               suffixIcon: Icons.visibility,
//               prefixIcon: Icons.lock,
//               hintText: 'Enter your Password',
//             ),
//             SizedBox(height: 10,),
//             // check box for must be 8 characters
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 Row(children: [
//                   Checkbox(value: true, onChanged: (v){},),
//                   Text('Must be 8 characters'),
//                 ],),
//                 Text('Forget Password', style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold),),
//               ],),
//             SizedBox(height: 10,),
//               //sign up button
//               Container(
//                 alignment: .center,
//                 width: MediaQuery.sizeOf(context).width,
//                 padding: EdgeInsets.all(10),
//                 decoration: BoxDecoration(
//                   color: Colors.blue,
//                   borderRadius: BorderRadius.circular(12),
//                 ),
//                 child: Text('Sign up', style: TextStyle(color: Colors.white, fontSize: 20),),
//               ),
//               SizedBox(height: 10,),
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   Container(
//                     color: Colors.amber,
//                     height: 2,
//                     width: MediaQuery.sizeOf(context).width*0.20,
//                   ),
//                    Text('Or login with'),
//                    Container(
//                     color: Colors.black,
//                     height: 2,
//                     width: MediaQuery.sizeOf(context).width*0.20,
//                   ),  
//                 ],
//               ),
//               SizedBox(height: 10,),

//              Row(
//               mainAxisAlignment: MainAxisAlignment.center,
//               spacing: 20,
//               children: [
//                 Container(
//                   padding: EdgeInsets.all(16),
//                   decoration: BoxDecoration(
//                     color: Colors.white,
//                     borderRadius: BorderRadius.circular(12),
//                   ),
//                   child: Icon(Icons.apple, size: 28, color: Colors.black,),
//                 ),
//                  Container(
//                   padding: EdgeInsets.all(16),
//                   decoration: BoxDecoration(
//                     color: Colors.white,
//                     borderRadius: BorderRadius.circular(12),
//                   ),
//                     child: Icon(Icons.g_mobiledata_rounded, size: 28, color: Colors.red,),
//                  ),
//                Container(
//                  alignment: .center,
//                  padding: EdgeInsets.all(16),
//                  decoration: BoxDecoration(
//                    color: Colors.white,
//                    borderRadius: BorderRadius.circular(12),
//                  ),
//                  child: Icon(Icons.facebook, size: 28, color: Colors.blue,),
//                ),
//               ],
//              ),
              

// // already have an account
//               Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   Text('Already have an account?'),
//                   ElevatedButton(onPressed: (){
//                     Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginScreen()));
//                   }, child: Text('Login', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),),)
//                 ],
//               ),
//           ],
//         ),
//       ),
//     );
//   }
// }