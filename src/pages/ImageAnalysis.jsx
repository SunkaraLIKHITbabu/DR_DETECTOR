import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import toast from 'react-hot-toast'
import axios from 'axios'
import { Bar } from 'react-chartjs-2';
import WorkingVideos from '../components/analysis/WorkingVideos';
import eyeSketch from '../assets/eye-sketch.png';
import leftEyeSketch from '../assets/left-eye-sketch.png';
import { GridLoader, MoonLoader } from 'react-spinners';
import rightEyeSketch from '../assets/right-eye-sketch.png';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ImageAnalysis() {
  const [eyeImage, setEyeImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading,setLoading] = useState(false);


  const diabeticStages = {
    "class1":
{    
      stage: "Prediabetes",
      description: "Blood sugar levels are slightly elevated, but no retinopathy is observed."
    
  },
  "class2":{
    
      stage: "Early Type 1 or Type 2 Diabetes",
      description: "Blood sugar levels are elevated. If poorly controlled, mild retinopathy begins to develop."
    
  },
  "class3":{
    
      stage: "Progressive Diabetes",
      description: "Uncontrolled blood sugar leads to moderate and severe retinal changes, corresponding to moderate and severe nonproliferative retinopathy."
    
  },
  "class4":{
    
      stage: "Advanced Diabetes with Complications",
      description: "Retinal damage worsens, corresponding to severe nonproliferative retinopathy."
    
  },
  "class5":{
  
      stage: "Long-standing Diabetes",
      description: "Leads to proliferative diabetic retinopathy with vision-threatening complications."
    
  },
  }

  const answ = {
    "class1": {
      stage: "No Apparent Retinopathy",
      details: [
        "The retina appears healthy with no signs of damage.",
        "Early diabetes with well-controlled blood sugar may not show any retinal changes."
      ]
    },
   "class2": {
      stage: "Mild Nonproliferative Retinopathy",
      details: [
        "Microaneurysms (tiny bulges in retinal blood vessels) are present.",
        "No vision changes typically noticed.",
        "May occur in the early stages of diabetes."
      ]
    },
    "class3": {
      stage: "Moderate Nonproliferative Retinopathy",
      details: [
        "Retinal blood vessels swell and lose their ability to transport blood effectively.",
        "May start to cause mild vision problems.",
        "Common in mid-stage diabetes with poor glycemic control."
      ]
    },
    "class4": {
      stage: "Severe Nonproliferative Retinopathy",
      details: [
        "Many blood vessels are blocked, depriving parts of the retina of blood supply.",
        "Retina signals the growth of new blood vessels (neovascularization).",
        "Vision issues become more prominent.",
        "Associated with advanced diabetes complications."
      ]
    },
    "class5": {
      stage: "Proliferative Diabetic Retinopathy (PDR)",
      details: [
        "New abnormal blood vessels grow on the retina. These are fragile and prone to bleeding, leading to severe complications like vitreous hemorrhage or retinal detachment.",
        "This stage poses a risk of blindness."
      ]
    }
  };
  
  
  const [a,setA]=useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setEyeImage(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const handleReset = () => {
    setEyeImage(null);
    setAnalysisResults(null);
  };

  const handleStartTesting = async () => {
    if (!eyeImage) return;

    const formData = new FormData();
    try {
      const response = await fetch(eyeImage);
      const blob = await response.blob();
      const file = new File([blob], 'eyeImage.jpg', { type: blob.type });
      console.log("File", file);
      formData.append('image', file);
      // console.log("FormData : ", formData);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);                                                                                                                                                      
      }
      
      setLoading(true);

      const result = await axios.post('http://localhost:5000/predict', formData);
      const ans = result.data.prediction;
      toast.success("Prediction Succssful");
      console.log(ans);
      setA(ans);

      setAnalysisResults({
        predict: ans
      });
    } catch (error) {
      setLoading(false);
      toast.error("Prediction Failed");
      console.error('Error:', error);
    }
    finally{
      setLoading(false);
  }
  };

  const handleDownloadPrediction = () => {
    if (a) {
      const blob = new Blob(["Feature Detection\n\n","Stage : ",a,"\n\n","Disease Details\n\n",answ[a].stage,"\n\n",answ[a].details,"\n\n","Dieabetic Stage\n\n",diabeticStages[a].stage,"\n\n",diabeticStages[a].description], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'prediction_result.txt'; 
      link.click();
      URL.revokeObjectURL(link.href); 
    }
  };


  // const barChartData = {
  //   labels: ['Microaneurysms', 'Hemorrhages', 'Hard Exudates', 'Soft Exudates'],
  //   datasets: [
  //     {
  //       label: 'Detected Features',
  //       data: analysisResults ? [
  //         analysisResults.features.microaneurysms,
  //         analysisResults.features.hemorrhages,
  //         analysisResults.features.hardExudates,
  //         analysisResults.features.softExudates
  //       ] : [],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.5)',
  //         'rgba(54, 162, 235, 0.5)',
  //         'rgba(255, 206, 86, 0.5)',
  //         'rgba(75, 192, 192, 0.5)'
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)'
  //       ],
  //       borderWidth: 1
  //     }
  //   ]
  // };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-green-700 mb-8"
      >
        Diabetic Retinopathy Prediction
      </motion.h1>

      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-8">Upload Eye Image for Prediction</h2>
        
        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Left Static Eye */}
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium text-gray-700 mb-4">Left Eye</p>
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
              <img 
                src={leftEyeSketch} 
                alt="Left eye diagram" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Upload Section */}
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium text-gray-700 mb-4">Eye Image</p>
            <div className="w-64 h-64 border-4 border-dashed rounded-full p-4 mb-4 hover:border-green-500 transition-colors">
              <div 
                {...getRootProps()} 
                className="w-full h-full rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-white relative group"
              >
                <input {...getInputProps()} />
                {eyeImage ? (
                  <img src={eyeImage} alt="Uploaded eye" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <img src={eyeSketch} alt="Eye sketch" className="w-full h-full object-contain opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all">
                      <p className="text-center text-gray-500 group-hover:text-white">
                        Drop Image Here
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Static Eye */}
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium text-gray-700 mb-4">Right Eye</p>
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
              <img 
                src={rightEyeSketch} 
                alt="Right eye diagram" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleStartTesting}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            disabled={!eyeImage}
          >
            Start Testing
          </button>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-8">
          <GridLoader color="#4CAF50" loading={loading} size={20} />
          <p className="text-2xl text-green-700 ml-4">Analyzing the image, please wait...</p>
        </div>
      )}

      {analysisResults &&  analysisResults.predict && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-5xl font-bold mb-6 text-center
          ">Analysis Results</h3>
          
          <div>
            <h4 className="text-3xl font-medium mb-4">Feature Detection</h4>
            <h1 className="text-1xl font-medium mb-4">Stage : {a} </h1>
            {/* <Bar data={barChartData} /> */}
            

            <h3 className='text-2xl font-medium mb-4 mt-10'>Diabetic Retinopathy Stage</h3>
<p className=' text-1xl font-bold underline text-black-500'>{answ[a].stage}</p>
<p className='text-lg mt-1'>
{answ[a].details}
</p>


             <h3 className=' text-2xl font-medium mb-4 mt-4'>Diabetic Stage</h3>

<p className=' text-1xl font-bold underline text-black-500 '>{diabeticStages[a].stage}</p>


<p className='text-lg mt-1'>
{diabeticStages[a].description}
</p>
<div className='flex justify-center'>
<button
              className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleDownloadPrediction}
            >
              Download Prediction Result
            </button>
            </div>
            <div className='flex justify-center'>
<button
              className="mt-10 bg-green-400  text-2xl font-bold text-white px-4 py-2 rounded hover:bg-blue-400"
              
            >
              👁 Healthy Vision | 💪 Better Health | 😊 Happier Life
            </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Working Videos Section */}
      <WorkingVideos />
    </div>
  );
}






export default ImageAnalysis;