import "./App.css";
import { QuestionGroup } from "./components/QuestionGroup.tsx";

function App() {
  return <QuestionGroup />;

  // const [data1, setData1] = useState({});
  // const [data2, setData2] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res1 = await axios.get("https://reqres.in/api/users/3");
  //       setData1(res1.data.data);
  //       console.log(res1);
  //       try {
  //         const res2 = await axios.get("https://reqres.in/api/unknown/23");
  //         setData2(res2.data.data);
  //         console.log(res2);
  //       } catch (err) {
  //         setData2(err);
  //         console.error(err);
  //       }
  //     } catch (err) {
  //       setData1(err);
  //       console.error(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // return (
  //   <div>
  //     <h2>Axios Library in React</h2>
  //     <p>
  //       {data1.email} {data2.email}
  //     </p>
  //   </div>
  // );
}

export default App;
